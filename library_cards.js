export const displayCards = (cards) => {
  $(".card").detach();
  const cardHtml = cards.map((card) => {
    return `
        <div id="playing_card" class="card ${card.show ? "rotate" : ""}">
         ${
           !card.matched
             ? `<img id=${card.id}  src=${
                 card.show ? card.imageElem.src : card.srcHidden
               } alt=${card.imageElem.alt} />`
             : ""
         }
        </div>
        `;
  });
  $("#cardWrapper").append(cardHtml);
  $(".rotate img").animate({ opacity: "1" }, 500);
};


export const displayResult = (result) => {
  $(".card").detach();
  const cardHtml = `
    <div class="result_wrapper card">
    <p>${result.percentage}%</p>
    <p>${result.message}</p>
    <div>
    <span>your score:</span><span id="score">${result.percentage}%</span>
    <span>highest score:</span><span id="score">${result.highestScore}%</span>
    </div>
        <div id="play_again">Play Again</div>
    </div>
    `;
  $("#cardWrapper").append(cardHtml);
};