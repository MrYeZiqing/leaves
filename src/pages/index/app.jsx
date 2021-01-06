import React, { Component } from 'react';
import {Button} from 'antd-mobile';
class App extends Component {
    componentWillUnmount () {
        // console.log('卸载');
    }
    componentDidMount () {
        throw 1;
    }
    render () {
        return (
            <div>
                <Button>点击</Button>
            </div>
        );
    }
}
export default App;
