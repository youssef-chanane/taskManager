import React from 'react';
import ReactDOM from 'react-dom';
import Form from './todo/Form';

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;


