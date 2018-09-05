import { IImageProps } from "@idsck/components/__global/Image/interfaces";
import AnimationHelper from "@idsck/helpers/AnimationHelper";
import styled from "styled-components";

const StyledImage = styled<IImageProps, "div">("div")`
  position: relative;
  overflow: ${(props) => (props.overflowing ? "hidden" : "initial")};

  .image {
    width: 100%;
    height: 100%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: ${(props) => (props.loading === false ? `blur(0)` : `blur(100px)`)};
    transition: filter 0.6s ${AnimationHelper.bezier.fastSlowCustom};
  }

  .image--wrapper {
    overflow: hidden;
    background: #fff;
  }

  img {
    filter: ${(props) => (props.loading === false ? `blur(0)` : `blur(100px)`)};
    transition: filter 0.6s ${AnimationHelper.bezier.fastSlowCustom};
  }
`;

export default StyledImage;
