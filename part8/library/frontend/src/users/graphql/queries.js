import { gql } from '@apollo/client'
import { USER_DETAILS } from './fargments'

export const ME = gql`
    query ME {
        me {
            ...UserDetails
        }
    }

    ${USER_DETAILS}
`
