import React from 'react';
import { Container } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';

//no longer needed
class LoginHallOfFame extends React.Component {
  render() {
    return (
      <div>
      <LoginNavBar/>
      <Container>
        <h1 className="my-4">Hall of Fame</h1>
      </Container>
      </div>
  );
  }
}

export default LoginHallOfFame;

/*+ dayjs@1.8.29
+ popper.js@1.16.1
+ jquery@1.9.1
+ typescript@3.9.7
+ @tensorflow/tfjs@1.7.4
added 21 packages from 70 contributors and audited 119 packages in 7.399s

3 packages are looking for funding
  run `npm fund` for details

found 3 vulnerabilities (2 moderate, 1 high)
  run `npm audit fix` to fix them, or `npm audit` for details

  audited 1772 packages in 7.996s

  63 packages are looking for funding
    run `npm fund` for details

  found 1 low severity vulnerability
    run `npm audit fix` to fix them, or `npm audit` for details
*/
