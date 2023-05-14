import pandas as pd
import json
import tqdm

dataset = {}
files = ['FIIT_PSY_N103.tsv',
'FIIT_PSY_N105.tsv',
'FIIT_PSY_N107.tsv',
'FIIT_PSY_N109.tsv',
'FIIT_PSY_N111.tsv',
'FIIT_PSY_N201.tsv',
'FIIT_PSY_N203.tsv',
'FIIT_PSY_N205.tsv',
'FIIT_PSY_N207.tsv',
'FIIT_PSY_N209.tsv',
'FIIT_PSY_N211.tsv',
'FIIT_PSY_N213.tsv',
'FIIT_PSY_N215.tsv',
'FIIT_PSY_N217.tsv',
'FIIT_PSY_N219.tsv',
'FIIT_PSY_N221.tsv',
'FIIT_PSY_N223.tsv',
'FIIT_PSY_N301.tsv',
'FIIT_PSY_N303.tsv',
'FIIT_PSY_N305.tsv',
'FIIT_PSY_N307.tsv',
'FIIT_PSY_N309.tsv',
'FIIT_PSY_N311.tsv',
'FIIT_PSY_N313.tsv',
'FIIT_PSY_N316.tsv',
'FIIT_PSY_N318.tsv',
'FIIT_PSY_N320.tsv',
'FIIT_PSY_N322.tsv',
'FIIT_PSY_N324.tsv',
'FIIT_PSY_N907.tsv',
'FIIT_PSY_N909.tsv',
'FIIT_PSY_N911.tsv',
'FIIT_PSY_N917.tsv',
'FIIT_PSY_N919.tsv',
'FIIT_PSY_p12.tsv',
'FIIT_PSY_P100.tsv',
'FIIT_PSY_P101.tsv',
'FIIT_PSY_P104.tsv',
'FIIT_PSY_P106.tsv',
'FIIT_PSY_P108.tsv',
'FIIT_PSY_P110.tsv',
'FIIT_PSY_P112.tsv',
'FIIT_PSY_P200.tsv',
'FIIT_PSY_P202.tsv',
'FIIT_PSY_P204.tsv',
'FIIT_PSY_P206.tsv',
'FIIT_PSY_P208.tsv',
'FIIT_PSY_P210.tsv',
'FIIT_PSY_P212.tsv',
'FIIT_PSY_P214.tsv',
'FIIT_PSY_P216.tsv',
'FIIT_PSY_P218.tsv',
'FIIT_PSY_P220.tsv',
'FIIT_PSY_P222.tsv',
'FIIT_PSY_P224.tsv',
'FIIT_PSY_P300.tsv',
'FIIT_PSY_P302.tsv',
'FIIT_PSY_P304.tsv',
'FIIT_PSY_P306.tsv',
'FIIT_PSY_P308.tsv',
'FIIT_PSY_P310.tsv',
'FIIT_PSY_P312.tsv',
'FIIT_PSY_P315.tsv',
'FIIT_PSY_P317.tsv',
'FIIT_PSY_P319.tsv',
'FIIT_PSY_P321.tsv',
'FIIT_PSY_P323.tsv',
'FIIT_PSY_P325.tsv',
'FIIT_PSY_P401.tsv',
'FIIT_PSY_P402.tsv',
'FIIT_PSY_P403.tsv',
'FIIT_PSY_P404.tsv',
'FIIT_PSY_P405.tsv',
'FIIT_PSY_P406.tsv',
'FIIT_PSY_P407.tsv',
'FIIT_PSY_P408.tsv',
'FIIT_PSY_P409.tsv',
'FIIT_PSY_P410.tsv',
'FIIT_PSY_P411.tsv',
'FIIT_PSY_P412.tsv',
'FIIT_PSY_P413.tsv',
'FIIT_PSY_P414.tsv',
'FIIT_PSY_P415.tsv',
'FIIT_PSY_P416.tsv',
'FIIT_PSY_P417.tsv',
'FIIT_PSY_P418.tsv',
'FIIT_PSY_P419.tsv',
'FIIT_PSY_P420.tsv',
'FIIT_PSY_P421.tsv',
'FIIT_PSY_P422.tsv',
'FIIT_PSY_P423.tsv',
'FIIT_PSY_P424.tsv',
'FIIT_PSY_P906.tsv',
'FIIT_PSY_P908.tsv',
'FIIT_PSY_P910.tsv',
'FIIT_PSY_P918.tsv',
'FIIT_PSY_P920.tsv']

for filename in tqdm.tqdm(files):
    df = pd.read_table('C:/Users/Lenovo/Desktop/LS/eye-tracking-emotions/Vizualizacia eye-tracking dat ovplyvnenych emociami/Data/gaze_data/' + filename)
    RecordingName = df['RecordingName'][0]
    df = df[df['MediaName'].notna()]
    df = df[df['FixationPointX (MCSpx)'].notna()]
    df = df[df['FixationPointY (MCSpx)'].notna()]


    if RecordingName not in dataset:
        dataset[RecordingName] = {}
    for index, row in df.iterrows():
        if row['MediaName'].replace('', '_') not in dataset[RecordingName]:
            dataset[RecordingName][row['MediaName'].replace('', '_')] = [[row['FixationPointX (MCSpx)'],row['FixationPointY (MCSpx)']]]
        elif [row['FixationPointX (MCSpx)'],row['FixationPointY (MCSpx)']] not in dataset[RecordingName][row['MediaName'].replace('', '_')]:
            dataset[RecordingName][row['MediaName'].replace('', '_')].append([row['FixationPointX (MCSpx)'],row['FixationPointY (MCSpx)']])


with open("C:/Users/Lenovo/Desktop/LS/eye-tracking-emotions/Vizualizacia eye-tracking dat ovplyvnenych emociami/Data/clear_data_v2.json", "w", encoding = 'utf8') as outfile:
    json.dump(dataset, outfile, ensure_ascii=False)