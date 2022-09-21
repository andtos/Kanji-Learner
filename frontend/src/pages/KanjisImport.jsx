
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
    margin: 15px;
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

class KanjisImport extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: '',
            meaning: '',
            reading: '',
        }
        this.states=[]
    }

    handleChangeImportCharacter = async event => {
        const character = event.target.value
        this.setState({ character, meaning: ' ', reading: ' ' })
    }

   

    handleImportKanji = async () => {
        
        const { character, meaning, reading } = this.state
        var success = 0
        const parsed = character.replace( /[\u3040-\u30ff]/g, " ")
        const result = parsed.trim().split(/\s+/)
        for(let x = 0; x < result.length; x++){
            const substring = result[x]
            const payload = { character: substring, meaning , reading  }

            await api.insertKanji(payload)
            success = 1;
        }
    
        this.setState({
            character: '',
            meaning: '',
            reading: '',
        })
        if(success === 1){
            window.alert(`Kanji imported successfully`)
        }
    }

    render() {
        const { character } = this.state
        return (
            <Wrapper>
                <Title>Import Kanjis</Title>

                <Label>Paste Japanese Text: </Label>
                <InputText
                    type="text"
                    value={character}
                    onChange={this.handleChangeImportCharacter}
                />

                

                <Button onClick={this.handleImportKanji}>Import Kanjis</Button>
                <CancelButton href={'/kanjis/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default KanjisImport