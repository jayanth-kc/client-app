import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";


export default function HomePage(){
    
    return(
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom:12}}  />
                    Reactivites
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivites...'></Header>
                <Button as={Link} to='/activites' size='huge' inverted>
                    Take me to the Activites
                </Button>
            </Container>
        </Segment>
    );
}