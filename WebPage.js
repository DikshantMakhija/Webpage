import React from "react"
import { data } from "./utils"
import star from "./icons/star-regular.svg"
import solidStar from "./icons/star-solid.svg"
import heartIcon from "./icons/heart.png"
import "./styles.scss"

const sampleImgUrl =
    "https://img.pngio.com/restaurants-clipart-fast-food-restaurant-best-marketing-fast-food-restaurant-png-920_575.png"

const Tile = ({ name, icon, ratings, offerText, locations, click }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i < ratings) stars.push(<img src={solidStar} />)
        else stars.push(<img src={star} />)
    }
    return (
        <div className="webpage-tile" onClick={() => click(icon)}>
            <div className="webpage-tile-img-container">
                <img className="webpage-img" src={icon} />
            </div>
            <div className="webpage-text-box">
                <div className="webpage-text-container">
                    <h2 className="webpage-text">{name}</h2>
                    <div className="webpage-ratings">
                        {stars}
                        {"  "}
                        <span className="webpage-ratings-container">
                            {ratings}
                        </span>
                    </div>
                </div>
                <div className="webpage-locations">
                    {locations.map((val, index) => (
                        <p className="webpage-location">
                            {val}
                            {index === locations.length - 1 ? "" : ", "}
                        </p>
                    ))}
                </div>
                <div className="webpage-offer-text">
                    {offerText.split("\n").map((t) => (
                        <p>{t}</p>
                    ))}
                </div>
                <div className="webpage-actions">
                    <div>
                        <img
                            className="webpage-wishlist-icon"
                            src={heartIcon}
                        />
                        <a
                            className="webpage-buynow-button"
                            role="button"
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            href={sampleImgUrl}
                            target="_blank">
                            Buy Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

class WebPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            imgSrc: undefined,
            restaurantData: [...data],
        }
    }

    handlePopupOpen = (imgSrc) => {
        this.setState({ open: true, imgSrc, restaurantData: [...data] })
    }

    handleClose = () => {
        this.setState({
            open: false,
            imgSrc: undefined,
            restaurantData: [...data],
        })
    }
    render() {
        const { open, imgSrc, restaurantData } = this.state

        const result = new Array(Math.ceil(restaurantData.length / 4))
            .fill()
            .map((_) => restaurantData.splice(0, 4))
        return (
            <div className="webpage-advantage-club-task">
                <div style={{ opacity: open && imgSrc ? "0.5" : "unset" }}>
                    {result.map((res) => (
                        <div className="webpage-row">
                            {res.map((val) => (
                                <Tile
                                    name={val.name}
                                    icon={val.icon}
                                    ratings={val.ratings}
                                    offerText={val.offerText}
                                    locations={val.locations}
                                    click={this.handlePopupOpen}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                {open && imgSrc && (
                    <div
                        className="webpage-dialog"
                        role="dialog"
                        onClick={this.handleClose}>
                        <div className="webpage-dialog-img-container">
                            <img className="webpage-dialog-img" src={imgSrc} />
                            <span className="webpage-dialog-info">
                                <i className="fa fa-info" /> Click on dialog to
                                close
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default WebPage
