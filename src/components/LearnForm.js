import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

async function onComplete(value) {

    console.log(value)
    // let file = value.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   file.data = e.target.result;
    // }
    // reader.readAsArrayBuffer(file);
  }

export default function LearnForm(props) {

    // create useState hooks per form entry

    // create a local onSubmit function which takes in the useState hooks

    return (
        <Form onSubmit={onComplete}>
          <Form.Group controlId='formFile'>
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={onComplete}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    );
}