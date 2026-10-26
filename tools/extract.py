# Turns the text of the dossier "The Wedding Creators" into lessons for the portal (src/course.js).
# Run: python3 tools/extract.py tools/temario.txt > src/course.js
import json, re, sys
L = open(sys.argv[1], encoding='utf8').read().split('\n')
def seg(a, b, skip=()):  # 1-indexed lines, b exclusive
    return [L[i-1] for i in range(a, b) if i not in skip]

M = [
 (1,'Conceptos básicos de la profesión',1,[
   (135,151,'¿Qué es una wedding planner?'),(151,166,'Sus funciones'),(166,176,'Por qué surge esta figura'),
   (176,182,'Su importancia en una boda'),(182,196,'Qué formación necesitas'),(196,293,'Reflexiones antes de empezar')],[],(293,300)),
 (2,'Creación y gestión de tu empresa',2,[
   (303,333,'Tu nicho de mercado y tu cliente ideal'),(333,392,'Material para arrancar la empresa'),(392,480,'Proveedores del sector'),
   (480,558,'Cómo arrancar a nivel legal'),(558,581,'Nombre, dominio y branding'),(581,606,'Tu imagen de empresa'),
   (606,640,'Tu plan de acción'),(640,755,'Las estrategias para que tu empresa arranque'),(755,902,'Estudio de mercado y DAFO'),
   (902,928,'Estrategias y secretos que nos han funcionado')],
   [(928,952,'Tu cliente ideal'),(952,978,'El nombre de tu empresa'),(978,1048,'Tu DAFO')],(1048,1061)),
 (3,'Diseña y ejecuta tu primer shooting',1,[
   (1078,1100,'Cómo diseñar un shooting que funcione'),(1100,1136,'Cómo conseguir que los proveedores colaboren'),
   (1136,1177,'Cómo ejecutar un shooting'),(1177,1209,'Cómo difundir tu shooting'),(1209,1220,'Estrategias y secretos que nos han funcionado')],
   [(1220,1239,'Tu primer shooting')],(1239,1246)),
 (4,'Captación de cliente potencial',2,[
   (1247,1274,'Dónde está tu cliente ideal'),(1274,1331,'Cómo atraer a tu cliente ideal'),(1331,1436,'Cómo preparar la reunión de captación'),
   (1436,1463,'La documentación antes y después de la reunión'),(1463,1483,'Psicología aplicada a la captación'),
   (1483,1495,'Estrategias y secretos que nos han funcionado')],
   [(1495,1548,'La primera reunión')],(1548,1552)),
 (5,'Tus servicios',2,[
   (1554,1574,'Qué servicios ofrecerá tu empresa'),(1574,1613,'Definición de cada servicio'),(1613,1695,'Organización integral'),
   (1695,1933,'Diseño y mood board'),(1933,2027,'Coordinación y wedding book'),(2027,2037,'Estrategias y secretos que nos han funcionado')],
   [(2037,2080,'Tu primer mood board')],(2080,2085)),
 (6,'Cómo poner precio a tus servicios',1,[
   (2086,2108,'Cómo calcular tus honorarios'),(2108,2179,'Cómo, cuándo y a quién cobrar'),(2179,2199,'Estrategias y secretos que nos han funcionado')],
   [],(2199,2201)),
 (7,'Planificación de una boda',1,[
   (2203,2211,'Presupuesto'),(2211,2274,'Planificación'),(2274,2306,'Producción'),(2306,2350,'Seguimiento de clientes'),
   (2350,2355,'Estrategias y secretos que nos han funcionado')],[],(2355,2369)),
 (8,'Marketing para tu empresa',1,[
   (2370,2381,'Formas de difundir tu trabajo'),(2381,2436,'Tu página web'),(2436,2602,'Redes sociales'),(2602,2631,'Blogs y revistas de bodas'),
   (2631,2672,'Publicidad'),(2672,2688,'Portafolio'),(2688,2707,'Competencia'),(2707,2739,'Herramientas para crear tu web'),
   (2739,2752,'Estrategias y secretos que nos han funcionado')],
   [(2752,2782,'Inspiración para tu contenido')],(2782,2800)),
 (9,'Habilidades sociales, imagen y actitud',1,[
   (2803,2832,'Tu imagen personal'),(2832,2866,'Relación con clientes y proveedores'),(2866,2895,'Tu actitud profesional'),
   (2895,2927,'Relación con tu equipo'),(2927,2959,'Relación con los novios'),(2959,3005,'Los invitados el día de la boda'),
   (3005,3028,'Estrategias y secretos que nos han funcionado')],[],(3028,3040)),
]
HEADER = re.compile(r'^(MÓDULO \d|[1-9]\.\d+(\.\d+)? |EJERCICIO|TUTORÍA|Estrategias y secretos|REFLEXIONES$|R$|\d+$|DAFO$|[DAFO] [DAFO]$)')
FIX = {'queuna':'que una','tuhistoria':'tu historia','eventros':'eventos','amig@':'amiga'}

def clean(lines, title):
    out=[]; first=True
    for raw in lines:
        s=raw.strip()
        if not s: out.append(''); continue
        if re.fullmatch(r'\d{1,3}', s): continue
        if first and HEADER.match(s): continue
        first=False
        for a,b in FIX.items(): s=s.replace(a,b)
        out.append(s)
    # drop leftover heading fragments at the start (wrapped titles)
    while out and (not out[0] or (len(out[0])<40 and not re.search(r'[.:!?]$', out[0]) and out[0][:1].islower())): out.pop(0)
    return out

def blocks(lines):
    """Join wrapped lines into paragraphs; short lines after a colon become list items; X.Y.Z lines become subheadings."""
    res=[]; para=[]; inlist=False
    def flush():
        nonlocal para
        if para: res.append(['p',' '.join(para)]); para=[]
    for s in lines:
        if not s: flush(); inlist=False; continue
        if res and res[-1][0]=='h' and not para and (s[:1].islower() or (s[:1].isdigit() and not re.match(r'^\d{1,2}[-.] ', s))):
            h=res.pop()
            if h[2]=='sub' and len(s)<45: res.append(['h',h[1]+' '+s,'sub']); continue
            para=[h[3]]
        m=re.match(r'^\d\.\d+\.\d+ (.*)', s)
        if m: flush(); res.append(['h',m.group(1),'sub',s]); inlist=False; continue
        m=re.match(r'^\d{1,2}[-.] ?([A-ZÁÉÍÓÚ].{2,70})$', s)
        if m and not s.endswith('.') and not s.endswith(':'): flush(); res.append(['h',m.group(1),'step',s]); inlist=False; continue
        if inlist and s[:1].isupper() and not para:
            res.append(['li',s]); 
            if s.endswith('.') and len(s)>80: inlist=False
            continue
        if inlist and res and res[-1][0]=='li' and s[:1].islower():
            res[-1][1]+=' '+s; continue
        if para and s[:1].isupper() and re.search(r'[.!?”"…)]$', para[-1]): flush()
        para.append(s)
        if s.endswith(':'): flush(); inlist=True
        elif s.endswith('.') and inlist: inlist=False
    flush()
    return [b[:2] for b in res]

course=[]
for n,t,h,ls,ex,tut in M:
    mod={'n':n,'t':t,'h':h,'lessons':[],'exercises':[]}
    for a,b,title in ls:
        mod['lessons'].append({'t':title,'b':blocks(clean(seg(a,b),title))})
    for a,b,title in ex:
        mod['exercises'].append({'t':title,'b':blocks(clean(seg(a,b),title))})
    mod['tutoria']=' '.join(x for x in clean(seg(*tut),'') if x)
    course.append(mod)
print('// Generated by tools/extract.py from the dossier "The Wedding Creators". Only the demo uses it: the live course is in the database (Panel → Curso).')
print('const COURSE_SEED=' + json.dumps(course, ensure_ascii=False) + ';')
