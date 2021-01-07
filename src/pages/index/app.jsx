import React, { Component } from 'react';
import {Button} from 'antd-mobile';
class App extends Component {
    componentWillUnmount () {
        // console.log('卸载');
    }
    componentDidMount () {
    }
    render () {
        return (
            <div>
                <Button onClick={() => {
                    location.href = '/pages/about';
                }}>关于我们</Button>
            </div>
        );
    }
}
export default App;
