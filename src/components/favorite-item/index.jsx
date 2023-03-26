import './styles.css'

const FavoriteItems = (props) => {

    const { id, title, image } = props;

    return (
        <div className="favorite-item">
            <div key={id}>
                <img src={image} alt="imagen" />
            </div>
            <p>{title}</p>
            <button type='button'>Remove to favorites</button>
        </div>
    )
}

export default FavoriteItems;
