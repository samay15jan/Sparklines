import tw from 'twin.macro'
import styled from 'styled-components'

const Container = styled.div`
  ${tw`w-2/3 lg:w-full mb-5 ml-0 lg:ml-2 flex gap-4`}
  overflow: hidden; /* Prevent overflow during animation */
`;

const Rectange = styled.div`
  ${tw`w-full h-6 mt-2 bg-gradient-to-r from-red-400 via-pink-500 to-indigo-400`}
  animation: moveRight 1s forwards; /* Add animation */
  
  @keyframes moveRight {
    0% {
      transform: translateX(-100%); /* Start off-screen to the left */
    }
    100% {
      transform: translateX(0); /* End at its original position */
    }
  }
`;

const Triangle = styled.div`
  ${tw`w-10`}
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-left: 30px solid #facc15;
  border-bottom: 20px solid transparent;
  animation: appear 1s forwards; /* Optional: make the triangle appear */
  
  @keyframes appear {
    0% {
      opacity: 0; /* Start invisible */
      transform: translateY(-10px); /* Start slightly above */
    }
    100% {
      opacity: 1; /* End fully visible */
      transform: translateY(0); /* End at its original position */
    }
  }
`;

const ArrowDesign = () => {
  return (
    <Container>
      <Rectange />
      <Triangle />
    </Container>
  );
}

export default ArrowDesign;
