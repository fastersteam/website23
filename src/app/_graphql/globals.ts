export const HEADER_QUERY = `
    query Header {
        Header {
            navItems {
                link {
                    url,
                    label,
                    type,
               }
            }
        }
    }
`;
