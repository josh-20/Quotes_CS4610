import { useState, useEffect, KeyboardEvent } from 'react'
import "./App.css"
interface Quote {
  _id: string;
  content: string;
  author: string;
}

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [message, setMessage] = useState("");
 

  async function loadRandom() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await result.json();
    setRandomQuote(quote);
  }
  async function loadQuotes () {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + message);
    const value = await result.json();
    setQuotes(value.results);
    setRandomQuote(null);
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    loadQuotes();
    
  }
  useEffect(() => {
    loadRandom();
  }, [])
  return (
    <body>
      <div className='centerDiv'>
      <div>
      <h1 className='titleHeader'>Quote Search</h1>
      <form className='mb-3' onSubmit={handleSubmit}>
        <input className='customInput' type="text" value={message} placeholder='Enter a Name' onChange={e => setMessage(e.target.value)}/>
        <button onClick={loadQuotes} className='customSearch'>Search</button>
      </form>
      {quotes.length == 0 && (<>
      <div className='randDiv'>
      <h5>{randomQuote?.content}</h5>
      <h6> - {randomQuote?.author}</h6>  
      </div>
      </>)}
      
      </div>
      <div>
        {
          quotes.map((quote) => (
            <div key={quote._id} className="mainQuoteDiv">
              <div>
                <h5>{quote.content}</h5>
              </div>
              <div>
              <h6>- {quote.author}</h6>
              </div>
              
            </div>
          ))
        }
      </div>


    </div>

    </body>  
  );
}

export default App
