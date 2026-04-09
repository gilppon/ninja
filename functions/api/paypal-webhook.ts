// @ts-nocheck

export async function onRequestPost({ request, env }) {
  try {
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);

    // 1. 이벤트 검증 (CAPTURE.COMPLETED 일때만 아이템 지급)
    if (body.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
      return new Response('Ignored', { status: 200 });
    }

    const capture = body.resource;
    // 우리가 프론트엔드에서 보냈던 식별자
    const customId = capture.custom_id; 

    if (!customId) {
      console.error('No custom_id provided in the webhook payload');
      return new Response('No custom_id', { status: 400 });
    }

    // 2. customId 파싱 (예: "uid_char_Ninja" 또는 "uid_premiumPass")
    let userId = '';
    let action = '';
    let target = '';

    if (customId.includes('_premiumPass')) {
      userId = customId.split('_')[0];
      action = 'premiumPass';
    } else if (customId.includes('_char_')) {
      const parts = customId.split('_char_');
      userId = parts[0];
      action = 'unlockChar';
      target = parts[1];
    } else {
      console.error('Invalid custom_id format:', customId);
      return new Response('Invalid custom_id', { status: 400 });
    }

    // 3. 파이어베이스 관리자 권한 토큰 발급 (REST API 용)
    const token = await getGoogleAuthToken(env.FIREBASE_SERVICE_ACCOUNT);

    // 4. Firestore 업데이트 (REST API)
    const projectId = env.FIREBASE_PROJECT_ID || 'ninja-game-brick-001';
    const commitUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`;
    
    let commitBody;

    if (action === 'unlockChar') {
      // 캐릭터 추가 (배열에 요소 추가)
      commitBody = {
        writes: [
          {
            transform: {
              document: `projects/${projectId}/databases/(default)/documents/users/${userId}`,
              fieldTransforms: [
                {
                  fieldPath: "ownedChars",
                  appendMissingElements: {
                    values: [
                      { stringValue: target }
                    ]
                  }
                }
              ]
            }
          }
        ]
      };
    } else if (action === 'premiumPass') {
      // 프리미엄 패스 활성화 (boolean 변환)
      commitBody = {
        writes: [
          {
            update: {
              name: `projects/${projectId}/databases/(default)/documents/users/${userId}`,
              fields: {
                hasPremiumPass: { booleanValue: true }
              }
            },
            updateMask: {
              fieldPaths: ["hasPremiumPass"]
            }
          }
        ]
      };
    }

    // 파이어베이스에 커밋 전송
    const response = await fetch(commitUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commitBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Firestore update failed:', errText);
      return new Response('Firestore update failed', { status: 500 });
    }

    return new Response('Success', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// 서비스 계정 JSON을 활용하여 GCP 액세스 토큰을 생성하는 함수
async function getGoogleAuthToken(serviceAccountJsonStr) {
  if (!serviceAccountJsonStr) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT is not set in environments');
  }

  const sa = JSON.parse(serviceAccountJsonStr);
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  
  const encodeBase64Url = (obj) => btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(payload);
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  
  // PEM 프라이빗 키 임포트
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  let pemContents = sa.private_key;
  if (pemContents.includes(pemHeader)) {
    pemContents = pemContents.substring(pemContents.indexOf(pemHeader) + pemHeader.length, pemContents.indexOf(pemFooter)).replace(/\n/g, '').replace(/\r/g, '');
  } else {
    // If it's single line without headers sometimes
    pemContents = sa.private_key.replace(/\\n/g, '').replace(/\n/g, '').replace(/\r/g, '');
  }
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsignedToken)
  );
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const jwt = `${unsignedToken}.${encodedSignature}`;
  
  // 토큰 교환
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error('Failed to get auth token: ' + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}
