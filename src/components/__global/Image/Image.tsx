/**
 *
 * Image Component
 * TODO: add some documentation here!
 *
 */
import React from "react";
import ProgressiveImage from "react-progressive-image";

import { IImageProps } from "@idsck/components/__global/Image/interfaces";
import StyledImage from "./StyledImage";

class Image extends React.Component<IImageProps> {

    render() {
        return (
            <ProgressiveImage
                src={this.getImageSrc()}
                placeholder={this.getImagePlaceholder()}
            >
                {(src, loading) => this.loadProgressiveImage(src, loading)}
            </ProgressiveImage>
        );
    }

    loadProgressiveImage(src: string, loading: boolean) {
        return (
            <StyledImage
                {...this.props}
                loading={loading}
            >
                {this.chooseRender(src)}
                {this.props.children}

                <noscript>
                    {this.chooseRender(this.getImageSrc())}
                    {this.props.children}
                </noscript>
            </StyledImage>
        );
    }

    chooseRender(src) {
        if (this.props.type && this.props.type === "img") {
            return (
                <div className="image--wrapper">
                    <img src={src} {...this.props.typeAttributes} />
                </div>
            );
        } else {
            return (
                <div className="image" style={{ backgroundImage: `url("${src}")` }} />
            );
        }
    }

    imageSelector = () => {
        return this.props.image.resize ? this.props.image.resize[1920] : this.props.image.url;
    }

    getImageSrc = () => {
        const { raw, size, src } = this.props;
        if (raw) {
            if (raw.resize) {
                if (size && raw.resize[size]) {
                    return raw.resize[size];
                } else {
                    return raw.resize[1920];
                }
            } else {
                return raw.url;
            }
        } else if (src) {
            return src;
        } else {
            return "";
        }
    }

    getImagePlaceholder = () => {
        const { raw, placeholder } = this.props;
        if (raw) {
            if (raw.resize) {
                if (raw.resize["thumb"]) {
                    return raw.resize["thumb"];
                } else {
                    return raw.resize[320];
                }
            } else {
                return this.getImageSrc();
            }
        } else if (placeholder) {
            return placeholder;
        } else {
            return "";
        }
    }
}

export default Image;
