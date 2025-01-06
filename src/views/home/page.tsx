import { Card } from "../payment/card";
import PaymentView from "../payment/payment.view";

export const HomePage: React.FC = () => {
  return (
    <>
      <section className="flex h-full w-screen flex-col items-center justify-center p-[100px] pb-0">
        <Card
          index={1}
          category="general"
          title="일반 결제"
          description="카드, 간편결제, 퀵계좌이체, 가상계좌, 휴대폰, 상품권"
        />
        <Card
          index={2}
          category="brandpay"
          title="브랜드 페이"
          description="카드, 계좌이체 (회사 자체 간편결제)"
        />
        <Card
          index={3}
          category="subscribe"
          title="자동결제(빌링)"
          description="카드 (구독형 결제)"
        />
        <Card
          index={4}
          category="abroad"
          title="해외 결제"
          description="페이팔 해외 간편결제"
          last
        />
      </section>
      <PaymentView />
    </>
  );
};
