import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import {  useNavigate } from "react-router-dom";

export default observer(function NavBar(){
    const {userStore:{user,logout}} = useStore();
    const navigate = useNavigate();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:10}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activites' name='Activites'/>
                <Menu.Item as={NavLink} to='/errors' name='Errors'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                <Menu.Item position="right">
                   <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                   <Dropdown pointing='top left' text={user?.displayName}>
                       <Dropdown.Menu>
                       <Dropdown.Item  as={Link} to={`profile/${user?.username}`} text='My Profile' icon='user' />
                       <Dropdown.Item  onClick={()=>logout(navigate)} text='Logout' icon='power'/>
                       </Dropdown.Menu>
                     

                   </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
})