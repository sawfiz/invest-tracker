import React, { PropsWithChildren } from 'react'
import {Text} from "@radix-ui/themes"

const StockName = ({children}: PropsWithChildren) => {
    if (!children) return null;

  return (
    <Text color="cyan" as="p">{children}</Text>
  )
}

export default StockName