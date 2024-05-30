import {Facebook,Instagram,Pinterest,Twitter} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`

`;
const Wrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-left: 2%;
`;

const Desc = styled.p`
  margin-bottom: 80px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;


const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })};
`;

const Logo = styled.img`
  width: 100px;
`;
const MII = styled.img`
  width: 100px;
  margin-left: 5%;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #0a0909; 
  margin: 0;
`;

const Footer = () => {
  return (
    <Container>
        <Divider/>
        <Wrapper>
            <Left>
            <Desc>FAQ Resources</Desc>
            <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest />
            </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            
        </Center>
        <Right>
            <Logo src="https://i.ibb.co/sWyFHjw/parter.png" />
            <MII src="https://i.ibb.co/4dvbZq9/MII.png" />
        </Right>
        </Wrapper>
    </Container>
  );
};

export default Footer;
