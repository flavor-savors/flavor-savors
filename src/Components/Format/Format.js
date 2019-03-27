import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';

class Format extends Component {
  render() {
    return (
      <div className='format'>
        <main >
            <nav><h1>Meal Plan</h1></nav>

        <div className='box'>

            <div className='container-1'>
                <section className='col-1'></section>
                <section className='col-2'></section>
            </div>

            <div className='container-2'>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
                <section className='sec-2'></section>
            </div>

            <div className='container-3'>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
                <section className='sec-3'></section>
            </div>

        </div>
            
        </main>
      </div>
    )
  }
}

class Example extends Component {
  render(){
    return(
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
          pageStyle={{
            padding: "20px",
          }}
        />
        <Format ref={el => (this.componentRef = el)} />
      </div>
    )
  }
}

export default Example;

// *TODO: fwgrw
// ** wfrfwegwg
// *? efrqrgfrwegergg
// *! freferfqefwerferg