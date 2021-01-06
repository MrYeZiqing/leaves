import React, { Component } from 'react';
import './index.less';
class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render () {
        return (
            <div>
                    admin
                <button onClick={() => {
                    location.href = '/pages/index';
                }}>首页</button>
            </div>
        );
    }
}
export default App;
