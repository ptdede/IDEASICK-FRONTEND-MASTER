/**
 *
 * HeroImage Component
 * TODO: add some documentation here!
 *
 */
import Gradient from "@idsck/components/__global/Gradient/Gradient";
import Image from "@idsck/components/__global/Image/Image";
import MediaChooser from "@idsck/components/__global/MediaChooser/MediaChooser";
import Paragraph from "@idsck/components/__global/Texts/Paragraph/Paragraph";
import Title from "@idsck/components/__global/Texts/Title/Title";
import withBaseComponent from "@idsck/hoc/withBaseComponent/withBaseComponent";
import React from "react";
import { Reveal } from "react-reveal";
import { ParallaxBanner } from "react-scroll-parallax";

import { IHeroImageProps } from "./interfaces";
import StyledHeroImage from "./StyledHeroImage";

class HeroImage extends React.Component<IHeroImageProps> {

    render() {
        return (
            <StyledHeroImage
                position={this.props.config.position && this.props.config.position.selected.name}
            >
                <ParallaxBanner
                    className="parallax--container"
                    layers={this.generateParallaxLayer()}
                    style={{ height: "100%" }}
                >
                    <Gradient
                        from={this.props.config.overlay.selected.from}
                        to={this.props.config.overlay.selected.to}
                    >
                        <div className="content--wrapper">
                            <div className="content">
                                <Reveal duration={1200} delay={500} effect="fadeInUpCustom">
                                    <Title
                                        color="white"
                                        uppercase={true}
                                        disabled={this.props.disableEdit}
                                        iframe={this.props.iframe}
                                        onDataChanged={(data) => this.props.handleDataChange("title", data)}
                                    >
                                        {this.props.title}
                                    </Title>
                                </Reveal>

                                <Reveal duration={1200} delay={800} effect="fadeInUpCustom">
                                    <Paragraph
                                        iframe={this.props.iframe}
                                        disabled={this.props.disableEdit}
                                        centered={true}
                                        color="#fff"
                                        maxWidth="26rem"
                                        onDataChanged={(data) => this.props.handleDataChange("text", data)}
                                    >
                                        {this.props.text}
                                    </Paragraph>
                                </Reveal>
                            </div>

                        </div>
                    </Gradient>

                    <MediaChooser
                        position="bottomRight"
                        disabled={this.props.disableEdit}
                        iframe={this.props.iframe}
                        onChangePropTriggered={() => this.props.triggerOptions(`image`, true)}
                    />
                </ParallaxBanner>
            </StyledHeroImage>
        );
    }

    generateParallaxLayer() {
        return [
            {
                children: <Image raw={this.props.image} />,
                amount: 0.25,
                slowerScrollRate: true,
            },
        ];
    }
}

export default withBaseComponent(HeroImage);
