import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>PetStash Supply Co.</h1>
                <h2>Category List:</h2>
                <div className="categories">
                    {
                        this.props.categories.map(category => {
                            const icon_path = require.context('../../../static/assets/images', true);
                            let icon_url = icon_path('./' + category.icon_url);
                            return (
                                <img key={category.id} src={icon_url} data-aos="fade-up" />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}