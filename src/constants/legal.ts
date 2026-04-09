import { Language } from '../locales/types';

export interface LegalContent {
  company: {
    name: string;
    representative: string;
    address: string;
    email: string;
    phone: string;
    businessInfo: string;
  };
  tokushoho?: Array<{ label: string; value: string }>;
  terms: {
    title: string;
    lastUpdated: string;
    sections: Array<{ title: string; content: string }>;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: Array<{ title: string; content: string }>;
  };
  refund: {
    title: string;
    lastUpdated: string;
    sections: Array<{ title: string; content: string }>;
  };
}

export const LEGAL_DATA: Record<Language, LegalContent> = {
  ko: {
    company: {
      name: "Next Haru (넥스트 하루)",
      representative: "신길호 (GILHO SHIN)",
      address: "1-7 Daishincho, Hadano-shi, Kanagawa 257-0034, Japan (〒257-0034 神奈川県秦野市大秦町1-7)",
      email: "support@next-haru.com",
      phone: "+81 80-8879-0002",
      businessInfo: "각 상품 페이지에 기재"
    },
    terms: {
      title: "이용약관",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. 약관의 승인", content: "Ninja Brick Action('서비스')에 접속하거나 이용함으로써 귀하는 본 이용약관에 동의하게 됩니다." },
        { title: "2. 서비스 설명", content: "본 서비스는 온라인 웹 기반 게임 콘텐츠 및 디지털 상품을 제공합니다." },
        { title: "3. 사용자 계정", content: "사용자는 계정 보안 유지에 대한 책임이 있습니다. 정확한 정보를 제공해야 하며, 위반 시 계정이 정지될 수 있습니다." },
        { title: "4. 지식재산권", content: "코드, 아트워크, 캐릭터, UI 및 브랜딩을 포함한 모든 콘텐츠는 Next Haru의 소유입니다. 무단 복제 또는 배포는 금지됩니다." },
        { title: "5. 결제", content: "결제는 PayPal/Stripe와 같은 안전한 제3자 제공업체를 통해 처리됩니다. 당사는 전체 신용카드 정보를 저장하지 않습니다." },
        { title: "6. 준거법", content: "본 약관은 일본 법의 관할을 받습니다." }
      ]
    },
    privacy: {
      title: "개인정보처리방침",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. 수집하는 정보", content: "이메일 주소 및 프로필 정보와 같이 귀하가 직접 제공하는 정보를 수집합니다. 또한 서비스 개선을 위해 게임 플레이 데이터 및 이용 통계를 수집합니다." },
        { title: "2. 정보 이용 목적", content: "귀하의 정보는 서비스 제공, 유지 및 개선, 사용자 인증, 개인화된 경험 제공을 위해 사용됩니다." },
        { title: "3. 데이터 공유", content: "당사는 귀하의 개인 데이터를 제3자에게 판매하지 않습니다. 서비스 운영에 도움을 주는 서비스 제공업체와 데이터를 공유할 수 있습니다." }
      ]
    },
    refund: {
      title: "환불정책",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. 디지털 상품 정책", content: "모든 구매는 디지털 상품이며 원칙적으로 환불이 불가능합니다." },
        { title: "2. 환불 가능 사례", content: "중복 결제, 상품 미전달을 초래하는 기술적 오류, 또는 사기 거래의 경우 환불이 검토될 수 있습니다." },
        { title: "3. 요청 방법", content: "환불 요청은 구매 후 7일 이내에 support@next-haru.com으로 제출해야 합니다. 주문 ID와 구매 날짜를 포함해 주세요." }
      ]
    }
  },
  en: {
    company: {
      name: "Next Haru",
      representative: "GILHO SHIN",
      address: "1-7 Daishincho, Hadano-shi, Kanagawa 257-0034, Japan",
      email: "support@next-haru.com",
      phone: "+81 80-8879-0002",
      businessInfo: "As displayed on each product page"
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. Acceptance of Terms", content: "By accessing or using Ninja Brick Action ('Service'), you agree to be bound by these Terms of Service." },
        { title: "2. Description of Service", content: "The Service provides online web-based game content and digital goods." },
        { title: "3. User Accounts", content: "Users are responsible for maintaining account security. You must provide accurate information. We may suspend accounts for violations." },
        { title: "4. Intellectual Property", content: "All content including code, artwork, characters, UI, and branding belongs to Next Haru. Unauthorized copying or distribution is prohibited." },
        { title: "5. Payments", content: "Payments are processed via secure third-party providers such as PayPal/Stripe. We do not store full credit card information." },
        { title: "6. Governing Law", content: "These Terms shall be governed by the laws of Japan." }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. Information We Collect", content: "We collect information you provide directly to us such as your email address and profile information. We also collect gameplay data and usage statistics to improve our service." },
        { title: "2. How We Use Information", content: "Your information is used to provide, maintain, and improve our services, authenticate users, and personalize your experience." },
        { title: "3. Data Sharing", content: "We do not sell your personal data to third parties. We may share data with service providers who assist us in operating our application." }
      ]
    },
    refund: {
      title: "Refund Policy",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. Digital Product Policy", content: "All purchases are digital goods and are generally non-refundable." },
        { title: "2. Refund May Be Granted If", content: "Refunds may be considered in cases of duplicate charges, technical failure preventing delivery, or fraudulent transactions." },
        { title: "3. How to Request", content: "Refund requests must be submitted within 7 days of purchase via support@next-haru.com. Please include your Order ID and purchase date." }
      ]
    }
  },
  ja: {
    company: {
      name: "Next Haru",
      representative: "GILHO SHIN",
      address: "〒257-0034 神奈川県秦野市大秦町1-7",
      email: "support@next-haru.com",
      phone: "080-8879-0002",
      businessInfo: "各商品ページに記載"
    },
    tokushoho: [
      { label: '事業者の名称', value: 'Next Haru' },
      { label: '運営統括責任者', value: 'GILHO SHIN' },
      { label: '所在地', value: '〒257-0034 神奈川県秦野市大秦町1-7' },
      { label: '連絡先メールアドレス', value: 'support@next-haru.com' },
      { label: '電話番号', value: '080-8879-0002' },
      { label: '販売価格', value: '各商品ページに記載' },
      { label: '商品代金 이외に必要な料金', value: 'インターネット接続料金その他の電気通信回線の通信に関する費用はお客様にてご負担ください。' },
      { label: '支払方法', value: 'クレジットカード決済, PayPal' },
      { label: '支払時期', value: 'ご購入時に即時決済されます。' },
      { label: '商品の引渡時期', value: '決済完了後、直ちにご利用いただけます。' },
      { label: '返品・キャンセル', value: 'デジタルコンテンツという商品の性質上、原則として購入後の返品・キャンセルはお受けできません。' },
    ],
    terms: {
      title: "利用規約",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. 規約の同意", content: "Ninja Brick Action（以下「本サービス」）にアクセス、または利用することにより、お客様は本利用規約に同意したものとみなされます。" },
        { title: "2. サービスの内容", content: "本サービスは、オンラインのウェブベースのゲームコンテンツおよびデジタルアイテムを提供します。" },
        { title: "3. ユーザーアカウント", content: "ユーザーはアカウントのセキュリティ維持に責任を負います。正確な情報を提供する必要があり、規約違反の場合はアカウントを停止することがあります。" },
        { title: "4. 知的財産権", content: "コード、アートワーク、キャラクター、UI、ブランディングを含むすべてのコンテンツは Next Haru に帰속します。無断転載・配布は禁止されています。" },
        { title: "5. お支払い", content: "決済は PayPal/Stripe などの安全な外部プロバイダーを通じて処理されます。当社はクレジットカードの詳細情報を保持しません。" },
        { title: "6. 準拠法", content: "本規約は日本法を準拠法とします。" }
      ]
    },
    privacy: {
      title: "プライバシーポリシー",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. 収集する情報", content: "メールアドレスやプロファイル情報など、お客様から直接提供される情報を収集します。また、サービス向上のため、プレイデータや統計情報を収集します。" },
        { title: "2. 情報の利用目的", content: "収集した情報は、サービスの提供、維持、改善、ユーザー認証、およびパーソナライズされた体験の提供に使用されます。" },
        { title: "3. データの共有", content: "当社は個人データを第三者に販売しません。サービスの運営を支援する委託先にデータを共有する場合があります。" }
      ]
    },
    refund: {
      title: "返金ポリシー",
      lastUpdated: "2026-04-09",
      sections: [
        { title: "1. デジタルコンテンツの性質", content: "すべての購入はデジタルアイテムであり、原則として返金はできません。" },
        { title: "2. 返金が認められる場合", content: "重複決済、技術的エラーによる未適用、または不正取引などの場合は返金を検討することがあります。" },
        { title: "3. 申請方法", content: "返金申請は購入から7日以内に support@next-haru.com までご連絡ください。注文IDと購入日を記載してください。" }
      ]
    }
  },
  zh: {
    // Fallback to EN for main content but with translated titles
    company: { name: "Next Haru", representative: "GILHO SHIN", address: "Kanagawa, Japan", email: "support@next-haru.com", phone: "+81 80-8879-0002", businessInfo: "如产品页面所示" },
    terms: { title: "服务条款", lastUpdated: "2026-04-09", sections: [{ title: "1. 接受条款", content: "访问或使用本服务即表示您同意受这些条款的约束。" }] },
    privacy: { title: "隐私政策", lastUpdated: "2026-04-09", sections: [{ title: "1. 信息收集", content: "我们收集您直接提供的信息，如电子邮件地址。" }] },
    refund: { title: "退款政策", lastUpdated: "2026-04-09", sections: [{ title: "1. 数字产品政策", content: "所有购买的数字产品通常不予退款。" }] }
  },
  es: {
    company: { name: "Next Haru", representative: "GILHO SHIN", address: "Kanagawa, Japan", email: "support@next-haru.com", phone: "+81 80-8879-0002", businessInfo: "Como se muestra en la página del producto" },
    terms: { title: "Términos de Servicio", lastUpdated: "2026-04-09", sections: [{ title: "1. Aceptación", content: "Al usar el servicio, aceptas estos términos." }] },
    privacy: { title: "Política de Privacidad", lastUpdated: "2026-04-09", sections: [{ title: "1. Colección", content: "Recopilamos información de contacto." }] },
    refund: { title: "Política de Reembolso", lastUpdated: "2026-04-09", sections: [{ title: "1. Productos Digitales", content: "Las compras digitales no son reembolsables." }] }
  }
};
