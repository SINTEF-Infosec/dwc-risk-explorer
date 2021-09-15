from openpyxl import load_workbook
import json

RRMD_FILE = 'data/rrmd.xlsx'
NB_MEASURES = 73
OUTPUT_FILE = "public/resources/measures.json"

RRMD_SPAN = 24

wb2 = load_workbook(filename = 'data/rrmd.xlsx')
wb2.active = 3 
ws2 = wb2.active

def read_list(column, start_row, span):
    elts = []
    for k in range(span):
        elt = ws2["{}{}".format(column, start_row + k)].value
        if elt is not None:
            elts.append(elt)
    return elts

def read_measure(i):
    print("[+] Handling measure %d" % i)
    m_row = 2 + i * RRMD_SPAN
    measure_id = str(ws2["A{}".format(m_row)].value)
    measure_name = ws2["B{}".format(m_row)].value
    measure_description = ws2["C{}".format(m_row)].value
    measure_type = read_list("D", m_row, RRMD_SPAN)
    measure_type_of_source = read_list("E", m_row, RRMD_SPAN)
    measure_type_of_threat = read_list("F", m_row, RRMD_SPAN)
    measure_type_of_event = read_list("G", m_row, RRMD_SPAN)
    measure_specific_asset = read_list("H", m_row, RRMD_SPAN)
    measure_type_of_asset = read_list("I", m_row, RRMD_SPAN)
    measure_consequence = read_list("J", m_row, RRMD_SPAN)
    measure_risk_reduction_mechanism =ws2["K{}".format(m_row)].value
    measure_characteristic_of_action =ws2["L{}".format(m_row)].value
    measure_comments =ws2["M{}".format(m_row)].value
    measure_details =ws2["O{}".format(m_row)].value

    return {
       "id": measure_id,
       "short_name": measure_name,
       "description": measure_description,
       "type_of_measure": measure_type,
       "type_of_source": measure_type_of_source,
       "type_of_threat": measure_type_of_threat,
       "type_of_event": measure_type_of_event,
       "specific_asset": measure_specific_asset,
       "type_of_asset": measure_type_of_asset,
       "consequence": measure_consequence,
       "risk_reduction_mechanism": measure_risk_reduction_mechanism,
       "characteristics_of_action": measure_characteristic_of_action,
       "comments": measure_comments,
       "details": measure_details
   }

rrm = [read_measure(k) for k in range(NB_MEASURES + 1)]

with open(OUTPUT_FILE, 'w') as outfile:
     json.dump(rrm, outfile)
