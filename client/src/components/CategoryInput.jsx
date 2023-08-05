export default function CategoryInput({isChecked,callback, cat }) {
    return (
        <div  className="category">
            <input checked={isChecked} onChange={callback} type="radio" name="cat" value={cat} id={cat} />
            <label htmlFor={cat}>{cat}</label>
        </div>
    )
}