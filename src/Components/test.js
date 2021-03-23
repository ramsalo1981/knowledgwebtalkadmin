import React from 'react';
import ChildComponent from './ChildComponent';
 
class ParentComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: "blue"
        };
	this.onChangeTextColor = this.onChangeTextColor.bind(this);
    }
	onChangeTextColor(e) {
        var newColor = e.target.value;
        this.setState({color: newColor});
    }
    render() {
        return (
            <container-wrapper>
                <ChildComponent inputVal={this.state.color} />
		<input type="text" value={this.state.color} onChange={(e) => this.onChangeTextColor(e)}/>
                <h5>We have set input value is {this.state.color} inside Parent Component</h5>
            </container-wrapper>
        );
    }
}
 
export default ParentComponent

import React from 'react';
 
class ChildComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
	let { inputVal } = this.props;
        return (
            <container>
                <input type="text" value={inputVal} readonly />
                <h2 style={{color:inputVal}}>Child Component Input Value Color is {this.props.inputVal}</h2>
            </container>
        );
    }
}
    
export default ChildComponent