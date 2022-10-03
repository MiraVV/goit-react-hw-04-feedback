import React from 'react';
import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import './App.styled.jsx';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Statistics/Notification';
import { Wrapper } from './App.styled';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const onLeaveFeedback = propertyName => {
    switch (propertyName) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        break;
    }
  };

  const countPositiveFeedbackPercentage = propertyName => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }
    const result = (good / total) * 100;
    return Number(result.toFixed(0));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Wrapper>
      <Section title="Please leave feedback">
        <FeedbackOptions
          // options={Object.keys({ good, bad, neutral })}
          options={['good', 'bad', 'neutral']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {!total ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </Wrapper>
  );
}
// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = propertyName => {
//     this.setState(prevState => {
//       const value = prevState[propertyName];
//       return {
//         [propertyName]: value + 1,
//       };
//     });
//   };

//   countTotalFeedback() {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   }
//   countPositiveFeedbackPercentage() {
//     const total = this.countTotalFeedback();
//     if (!total) {
//       return 0;
//     }
//     const result = (this.state.good / total) * 100;
//     return Number(result.toFixed(0));
//   }
//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <Wrapper>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {!total ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           )}
//         </Section>
//       </Wrapper>
//     );
//   }
// }

// export default App;
