$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck'

    async function draw() {
        let data = await $.getJSON(`${baseURL}/new/draw`);
        let newCard = data.cards[0]
        console.log(`${newCard['value']} of ${newCard['suit']}`);
    }
    draw();

    async function multiDraw() {
        let firstCardData = await $.getJSON(`${baseURL}/new/draw`)
        let id = firstCardData['deck_id']
        let secondCardData = await $.getJSON(`${baseURL}/${id}/draw`);
        [firstCardData, secondCardData].forEach(card => {
            let {suit, value} = card.cards[0];
            console.log(`${value} of ${suit}`)
        })
    }
    multiDraw()

    async function display() {
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw`)
            let cardImg = cardData.cards[0].image;
            $cardArea.append(
                $('<img>', {
                    src : cardImg
                })
            );
            if (cardData.remaining === 0) $btn.remove();
            });   
    }
    display()
})