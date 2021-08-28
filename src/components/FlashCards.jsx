export default function FlashCards({ children: FlashCard }) {
  return (
    <div className="border p-2 flex flex-row flex-wrap items-center justify-center ">
      {FlashCard}
    </div>
  );
}
