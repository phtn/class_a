import {orange500, blue500} from 'material-ui/styles/colors'

const schema = {
  nickname: {
    type: String,
    unique: true,
    materialForm: {
      floatingLabelText: 'Codename',
      hintText: 'McGyver...',
      floatingLabelStyle: {
        color: orange500,
        fontSize: '30px'
      }
    }
  }
}
export default schema
