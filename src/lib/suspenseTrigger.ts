const suspenseTrigger = () => {
    throw new Promise(() => { })
}

export default suspenseTrigger