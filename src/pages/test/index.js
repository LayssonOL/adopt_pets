import * as React from 'react';
import { Button } from 'antd';
import Title from 'antd/lib/skeleton/Title';

class Test extends React.Component {
	state = {
		firstName: 'John',
		lastName: 'Lennon',
		personalInfo: {
			age: 40,
			address: 'Liverpool'
		}
	};

	handleIncrementAge = () => {
		this.setState(prevState => ({ personalInfo: { ...prevState, age: prevState.personalInfo.age + 1 } }));
	}

	render() {
		<React.Fragment>
			<div>
				<Title>Age: {{this.state.personalInfo.age}}</Title>
                <Button onClick={this.handleIncrementAge}>Increment</Button>
			</div>
		</React.Fragment>
	}
}

export default Test;
