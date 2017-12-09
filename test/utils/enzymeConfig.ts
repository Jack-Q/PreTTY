
// tslint:disable-next-line:no-var-requires
const { configure } = require('enzyme');
// tslint:disable-next-line:no-var-requires
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
