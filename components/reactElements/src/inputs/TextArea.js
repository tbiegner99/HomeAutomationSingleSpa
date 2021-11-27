import { TextArea as FormTextArea } from '@tbiegner99/react-forms';
import TextInput from './TextInput';

class TextArea extends TextInput {
  get inputComponent() {
    return FormTextArea;
  }
}

export default TextArea;
