export const displayDate = (date) => {
    if (date === 0) {
        return "N/A"
    }

    return new Date(date)
        .toLocaleDateString('es-mx',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }
        )
}
