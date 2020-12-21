import React, { useState } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 300px;
`
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 8px;
  padding: 8px 8px 8px 8px;
  outline: none;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0);
  background: #f7f1f0;
  color: #333;

  :focus {
    border: 2px solid #ed6ea0;
  }
`
const SubmitButton = styled.button`
  width: 100%;
  border-width: 0;
  box-sizing: border-box;
  background-color: #43a047;
  background-image: linear-gradient(to right, #0ba360, #3cb085, #2bb673);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.3);
  color: #fffdfd;
  padding: 8px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
`

type Props = {
  onSubmit?: (command: string) => void
}
const CommandInput: React.VFC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    submit()
    e.preventDefault()
  }

  const submit = () => {
    onSubmit && onSubmit(value)
    setValue('')
  }

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <Input value={value} onChange={handleChange} />
        <SubmitButton type="submit">Execute</SubmitButton>
      </form>
    </Root>
  )
}
export default CommandInput
