import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner(props) {
    if (props.display) {
        return <Spinner animation="border" />
    } else {
        return <></>
    }
}