import { Container, Menu} from "semantic-ui-react"
const Header_Cust = () =>{
    return (
        <Menu inverted borderless style={{padding:".3rem", marginBottom:"20px"}} attached>
            <Container textAlign ="center">
                <Menu.Item name="home" >
                    <h1>Manage <span>Customers</span></h1>
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default Header_Cust;