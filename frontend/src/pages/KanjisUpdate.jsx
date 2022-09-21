import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class KanjisUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            character: '',
            meaning: '',
            reading: '',
        }
    }

    handleChangeInputCharacter = async event => {
        const character = event.target.value
        this.setState({ character })
    }

    handleChangeInputMeaning = async event => {
        const meaning = event.target.value

        this.setState({ meaning })
    }

    handleChangeInputReading = async event => {
        const reading = event.target.value
        this.setState({ reading })
    }

    handleUpdateKanji = async () => {
        const { id, character, meaning, reading } = this.state
        const payload = { character, meaning, reading }

        await api.updateKanjiById(id, payload).then(res => {
            window.alert(`Kanji updated successfully`)
            this.setState({
                character: '',
                meaning: '',
                reading: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const kanji = await api.getKanjiById(id)

        this.setState({
            character: kanji.data.data.character,
            meaning: kanji.data.data.meaning,
            reading: kanji.data.data.reading,
        })
    }

    render() {
        const { character, meaning, reading } = this.state
        return (
            <Wrapper>
                <Title>Create Kanji</Title>

                <Label>Character: </Label>
                <InputText
                    type="text"
                    value={character}
                    onChange={this.handleChangeInputCharacter}
                />

                <Label>Meaning: </Label>
                <InputText
                    type="text"
                    value={meaning}
                    onChange={this.handleChangeInputMeaning}
                />

                <Label>Reading: </Label>
                <InputText
                    type="text"
                    value={reading}
                    onChange={this.handleChangeInputReading}
                />

                <Button onClick={this.handleUpdateKanji}>Update Kanji</Button>
                <CancelButton href={'/kanjis/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default KanjisUpdate