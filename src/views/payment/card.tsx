import { usePaymentStore } from "@/stores";
import { payment_category } from "@/stores/usePaymentStore";

interface CardProps {
  index: number;
  category: payment_category;
  title: string;
  description: string;
  last?: boolean;
}
export const Card: React.FC<CardProps> = ({
  index,
  category,
  title,
  description,
  last = false,
}) => {
  const { set_selected_category } = usePaymentStore();

  const cardDefaultPositionY = (index - 1) * 36;
  const cardUpPositionY = 32 * index;

  return (
    <section
      style={{
        transform: `translateY(-${cardDefaultPositionY}px)`,
      }}
      className="flex w-[500px] cursor-pointer flex-col gap-2 rounded-xl border bg-white p-4 transition duration-300 hover:bg-blue-800 hover:text-white"
      onMouseEnter={(e) =>
        !last &&
        (e.currentTarget.style.transform = `translateY(-${cardUpPositionY}px)`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = `translateY(-${cardDefaultPositionY}px)`)
      }
      onClick={() => set_selected_category(category)}
    >
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Toss Payment</h1>
        {title}
      </div>
      <p>{description}</p>
    </section>
  );
};
