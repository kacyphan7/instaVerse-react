import axios from 'axios';
import { faker } from "@faker-js/faker";
import '../css/explore.css';
import '../css/search.css';

export default function Search() {





    return (
        <main>
            <div className="explore-page">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            <div className="explore-page">
                <div className="image-grid">
                    <div className="image-column">
                        <img
                            src={faker.image.url()}
                            alt="Image 1"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 2"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 3"
                            className="image-item"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src={faker.image.url()}
                            alt="Image 4"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 5"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 6"
                            className="image-item"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src={faker.image.url()}
                            alt="Image 7"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 8"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 9"
                            className="image-item"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src={faker.image.url()}
                            alt="Image 7"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 8"
                            className="image-item"
                        />
                    </div>
                    <div className="image-column">
                        <img
                            src={faker.image.url()}
                            alt="Image 4"
                            className="image-item"
                        />
                        <img
                            src={faker.image.url()}
                            alt="Image 5"
                            className="image-item"
                        />
                    </div>
                    <div className="image-column">
                        <img src={faker.image.url()} className="image-item" />
                        <img
                            src={faker.image.url()}
                            alt="Image 8"
                            className="image-item"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
