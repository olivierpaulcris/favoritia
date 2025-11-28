function Card({ title, author, img, date, score }) {
  const getScore = () => {
    let dataScore = {
      colorBg: "bg-gray-500",
      colorText: "text-gray-500",
      text: "No Score",
    };

    if (score) {
      if (Number(score) >= 9) {
        dataScore.colorBg = "bg-green-500";
        dataScore.colorText = "text-green-500";
        dataScore.text = "Excelent";
      } else if (Number(score) >= 8) {
        dataScore.colorBg = "bg-blue-500";
        dataScore.colorText = "text-blue-500";
        dataScore.text = "Good";
      } else if (Number(score) >= 7) {
        dataScore.colorBg = "bg-yellow-500";
        dataScore.colorText = "text-yellow-500";
        dataScore.text = "Regular";
      } else if (Number(score) >= 6) {
        dataScore.colorBg = "bg-orange-500";
        dataScore.colorText = "text-orange-500";
        dataScore.text = "Boring";
      } else {
        dataScore.colorBg = "bg-red-500";
        dataScore.colorText = "text-red-500";
        dataScore.text = "Bad";
      }
    } else {
      score = "0.0";
      dataScore.colorBg = "bg-gray-500";
      dataScore.colorText = "text-gray-500";
      dataScore.text = "No Score";
    }

    return (
      <div className="mt-4">
        <div class="flex items-center">
          <p
            class={`${dataScore.colorBg} text-white text-sm font-semibold inline-flex items-center p-1.5 rounded-sm`}
          >
            {score || "0"}
          </p>
          <p class={`ms-2 font-medium ${dataScore.colorText}`}>
            {dataScore.text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="group col-span-1 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full aspect-auto overflow-hidden">
        <img
          src={img}
          alt={`Cover for ${title}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x600/e2e8f0/4a5568?text=Error";
          }}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 90%, transparent 100%)",
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        <div>
          <h3
            className="font-bold text-gray-800 text-base leading-tight truncate"
            title={title}
          >
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 truncate" title={author}>
            {author}
          </p>
          <div>
            <p className="text-gray-400 text-xs">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
