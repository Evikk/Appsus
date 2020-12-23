export function NoteEdit({ }) {


    return (
        <section>
            <div className="notes-input">
                {/* <input type="text"/> */}
                <textarea name="" id="" cols="30" rows="2" placeholder={this.state.placeholder} onChange={this.handleChange}></textarea>
                {/* <label><i className='fas fa-palette'>{this.state.showColors&&<input type="color"/>}</i></label> */}


            </div>
            <div className="icons">
                <i className="fa fa-font" onClick={() => this.setNoteType('txt')}></i>
                <i className="fa fa-image" onClick={() => this.setNoteType('img')}></i>
                <i className="fab fa-youtube" onClick={() => this.setNoteType('video')}></i>
                <i className="fa fa-list-ul" onClick={() => this.setNoteType('todos')}></i>
                <i className="fa fa-plus" onClick={() => this.onAddNote()}></i>
            </div>
        </section>
    )


}