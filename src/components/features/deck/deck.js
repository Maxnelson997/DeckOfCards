import React, { useState, useEffect, useCallback } from 'react';
import Card from '../card/card';

const Deck = () => {

    const [initDeckInfo, setInitDeckInfo] = useState();
    const [deckInfo, setDeckInfo] = useState();
    const [cards, setCards] = useState([]);
    // let suits =  

    const [doneDrawing, setDoneDrawing] = useState(false); 

    const [suits, setSuits] = useState(
        [
            {
                suit: "SPADES",
                hasQueen: false,
                cards: []
            },
            {
                suit: "CLUBS",
                hasQueen: false,
                cards: []
            },
            {
                suit: "HEARTS",
                hasQueen: false,
                cards: []
            },
            {
                suit: "DIAMONDS",
                hasQueen: false,
                cards: []
            }
        ]

    )

    useEffect(() => {
        fetch('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
          .then((response) => response.json())
          .then((data) => setInitDeckInfo(data))
          .catch((error) => console.log(error.message));
      }, []);

      useEffect(() => {
        updateDeck(cards)
      }, [cards]);

    const drawCard = useCallback(() => {
        const fetchUrl = `http://deckofcardsapi.com/api/deck/${initDeckInfo ? initDeckInfo.deck_id : ''}/draw/?count=2`
        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                setDeckInfo(data);
                setCards(cards.concat(data.cards))
            })
            .catch((error) => console.log(error.message))
    })

    const updateDeck = (cards) => {
        // check each suit 
        if(!doneDrawing) {
            let newCards = cards.slice(-2);

    
            newCards.forEach(card => {
                let cards = suits.find(suitObj => suitObj.suit == card.suit).cards
                // go over existing cards in relevant suits
                let queenExists = false
                cards.map(card => {
                    queenExists = card.value == "QUEEN" ? true : false
                })
                let suitIndex = suits.findIndex(suitObj => suitObj.suit == card.suit)
                let modifiedSuit = suits[suitIndex]
                modifiedSuit.hasQueen = queenExists;
                if(!queenExists) { 
                    modifiedSuit.cards.push(card)
                    let newSuits = [...suits];
                    newSuits[suitIndex] = modifiedSuit
                    setSuits(newSuits)
                }
            })
    
            let allHaveQueen = true
            suits.forEach(suit => {

                allHaveQueen = !suit.hasQueen ? false : true;
                
                let reducer = ((prev, current) => {
                    return [...prev, current.value]
                })
                let cardsForEachSuit = suit.cards.reduce(reducer, [])
                
                console.log(`${suit.suit}: ${cardsForEachSuit}`)
            })
            console.log('all has queen', allHaveQueen);
            
            // set done drawing if all have queen
        }


    }

    return (
        <div className='deck'>
            <div className='deck__cards'>
            {
                cards ? cards.map((cardInfo) => {
                    return <Card {...cardInfo}/>
                }) : ''
            }
            </div>
            <div className='deck__buttons'>
                <button onClick={drawCard}>Draw Card</button>
            </div>
        </div>
    )
}

export default Deck;

