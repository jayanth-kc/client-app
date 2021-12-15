import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";


export default function HomePage(){
    return(
        <Container style={{marginTop:'7em'}}>
            <h1>Home</h1>
            <h2>Go To <Link to='/activites'>Activites</Link></h2>
        </Container>
    );
}