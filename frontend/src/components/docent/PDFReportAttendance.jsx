// Importar fuentes para que Vite las procese correctamente en la URL
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer'
import fontTitlesBoldUrl from '../../fonts/Mulish/static/Mulish-ExtraBold.ttf'
import fontSubtitlesUrl from '../../fonts/Mulish/static/Mulish-Medium.ttf'
import fontTextUrl from '../../fonts/Mulish/static/Mulish-Regular.ttf'

Font.register({
    family: 'fontTitlesBold',
    src: fontTitlesBoldUrl,
})

Font.register({
    family: 'fontSubtitles',
    src: fontSubtitlesUrl,
})

Font.register({
    family: 'fontText',
    src: fontTextUrl,
})

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica'
    },
    grayTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#b4b6b5',
        fontFamily: 'fontSubtitles'
    },
    subtitles: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7a7c7c',
        fontFamily: 'fontSubtitles'
    },
    titles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c2f2f',
        fontFamily: 'fontTitlesBold'
    },
    titulo: {
        fontSize: 24,
        marginBottom: 16,
        color: '#1a1a1a'
    },
    seccion: {
        marginBottom: 12
    },
    label: {
        fontSize: 10,
        color: '#666',
        marginBottom: 4
    },
    texto: {
        fontSize: 12,
        color: '#1a1a1a'
    },
    table: {
        display: "table",
        width: "auto",
        marginTop: 30,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 8
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeaderName: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f8fafc',
        padding: 8
    },
    tableColHeaderValue: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f8fafc',
        padding: 8,
        fontFamily: 'fontSubtitles'
    },
    tableColName: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8
    },
    tableColValue: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8
    },
    tableCellHeader: {
        fontSize: 10,
        fontFamily: 'fontTitlesBold',
        color: '#475569',
        textAlign: 'center'
    },
    tableCell: {
        fontSize: 10,
        fontFamily: 'fontText',
        color: '#334155',
        textAlign: 'center'
    },
    footer: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    signatureContainer: {
        width: '45%',
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#b4b6b5',
        marginBottom: 8,
        width: '100%',
    },
    signatureText: {
        fontSize: 12,
        fontFamily: 'fontTitlesBold',
        color: '#2c2f2f',
    },
    signatureSubtext: {
        fontSize: 10,
        fontFamily: 'fontText',
        color: '#7a7c7c',
        marginTop: 2,
    },
    infoContainer: {
        width: '45%',
        alignItems: 'flex-end',
    },

    infoLabel: {
        fontSize: 8,
        fontFamily: 'fontSubtitles',
        color: '#b4b6b5',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    infoDate: {
        fontSize: 11,
        fontFamily: 'fontTitlesBold',
        color: '#2c2f2f',
    },
    infoRef: {
        fontSize: 8,
        fontFamily: 'fontText',
        color: '#b4b6b5',
        marginTop: 4,
    }
})

// Componente que genera el PDF
export const PDFReportAttendance = ({ data }) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                        <Text style={{...styles.titles, fontSize: '16px'}}>
                            {data.cednom}
                        </Text>
                        <Text style={{...styles.titles, marginTop: '10px', fontSize: '26px'}}>
                            Reporte de Asistencia
                        </Text>
                        <Text style={{...styles.grayTitle, marginTop: '5px'}}>
                            Periodo Académico: {JSON.parse(data.info_current_cycle).cecnom}
                        </Text>
                    </View>
                    <View style={{backgroundColor: '#eff1f0', padding: '16px', borderRadius: '12px'}}>
                        <Text style={{...styles.grayTitle, textAlign: 'right', fontSize: '12px'}}>
                            CURSO
                        </Text>
                        <Text style={{...styles.titles, fontSize: '16px', marginBottom: '10px'}}>
                            {data.asgnom}
                        </Text>
                        <Text style={{...styles.grayTitle, textAlign: 'right', fontSize: '12px'}}>
                            DOCENTE
                        </Text>
                        <Text style={{...styles.titles, fontSize: '16px', marginTop: '5px'}}>
                            Prof. {data.usunom_docent}
                        </Text>
                    </View>
                </View>

                <View style={{marginTop: '40px', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{padding: '14px', borderRadius: '16px', backgroundColor: '#f5f7f6'}}>
                        <Text style={{...styles.grayTitle, fontSize: '12px'}}>
                            PROMEDIO ASISTENCIA
                        </Text>
                        <Text style={{...styles.titles, color: '#046a5c', marginTop: '5px'}}>
                            {data.average_attendance}%
                        </Text>
                    </View>
                    <View style={{padding: '14px', borderRadius: '16px', backgroundColor: '#f5f7f6'}}>
                        <Text style={{...styles.grayTitle, fontSize: '12px'}}>
                            TOTAL PRESENTES
                        </Text>
                        <Text style={{...styles.titles, color: '#343737', marginTop: '5px'}}>
                            {data.total_presents}
                        </Text>
                    </View>
                    <View style={{padding: '14px', borderRadius: '16px', backgroundColor: '#f5f7f6'}}>
                        <Text style={{...styles.grayTitle, fontSize: '12px'}}>
                            TOTAL AUSENTES
                        </Text>
                        <Text style={{...styles.titles, color: '#b5232c', marginTop: '5px'}}>
                            {data.total_absents}
                        </Text>
                    </View>
                </View>

                <View style={styles.table}>
                    {/* Tabla Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeaderName}>
                            <Text style={{...styles.tableCellHeader, textAlign: 'left'}}>Nombre completo</Text>
                        </View>
                        <View style={styles.tableColHeaderValue}>
                            <Text style={styles.tableCellHeader}>Asistencias</Text>
                        </View>
                        <View style={styles.tableColHeaderValue}>
                            <Text style={styles.tableCellHeader}>Ausencias</Text>
                        </View>
                        <View style={styles.tableColHeaderValue}>
                            <Text style={styles.tableCellHeader}>% Total</Text>
                        </View>
                    </View>
                    {/* Tabla Body */}
                    {data.info_table_report.map((student, index) => {
                        const attendancePercentage = Number(student.attendance);
                        let percentageColor = '#b5232c'; // Rojo por defecto
                        if (attendancePercentage >= 70) percentageColor = '#046a5c'; // Verde
                        else if (attendancePercentage >= 50) percentageColor = '#d97706'; // Naranja

                        return (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableColName}>
                                    <Text style={{...styles.tableCell, textAlign: 'left'}}>{student.usunom}</Text>
                                </View>
                                <View style={styles.tableColValue}>
                                    <Text style={styles.tableCell}>{student.assistences}</Text>
                                </View>
                                <View style={styles.tableColValue}>
                                    <Text style={styles.tableCell}>{student.absences}</Text>
                                </View>
                                <View style={styles.tableColValue}>
                                    <Text style={{...styles.tableCell, color: percentageColor, fontFamily: 'fontSubtitles', fontWeight: 'bold'}}>
                                        {student.attendance}%
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.footer}>
                    <View style={styles.signatureContainer}>
                        <View style={styles.line} />
                        <Text style={styles.signatureText}>Prof. {data.usunom_docent}</Text>
                        <Text style={styles.signatureSubtext}>Docente Titular</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Generado el</Text>
                        <Text style={styles.infoDate}>{data.date_generate_report}</Text>
                        <Text style={{...styles.infoLabel, color: '#5aa6c0', marginTop: 2, textTransform: 'none', fontSize: '12px', fontWeight: 'bold'}}>
                            Generado por: CEFCOC APP
                        </Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}