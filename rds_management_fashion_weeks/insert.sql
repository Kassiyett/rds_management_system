INSERT INTO HoldingCompany VALUES ('LVMH Moet Hennessy', 'Bernard Arnault', 500000000, 'Bernard Arnault', 1987);
INSERT INTO HoldingCompany VALUES ('Kering SA', 'François Pinault', 350000000, 'François-Henri Pinault', 1963);
INSERT INTO HoldingCompany VALUES ('L Brands Inc', 'Leslie Wexner', 150000000, 'Andrew Meslow', 1963);
INSERT INTO HoldingCompany VALUES ('Capri Holdings', 'Michael Kors', 120000000, 'John Idol', 1981);
INSERT INTO HoldingCompany VALUES ('Richemont Group', 'Johann Rupert', 280000000, 'Johann Rupert', 1988);

INSERT INTO Brand_1 VALUES ('Louis Vuitton', 1854, 'Louis Vuitton');
INSERT INTO Brand_2 VALUES ('Louis Vuitton', 'France', 'Louis Vuitton', 'LVMH Moet Hennessy');

INSERT INTO Brand_1 VALUES ('Gucci', 1921, 'Guccio Gucci');
INSERT INTO Brand_2 VALUES ('Gucci', 'Italy', 'Guccio Gucci', 'Kering SA');

INSERT INTO Brand_1 VALUES ('Victoria''s Secret', 1977, 'Roy Raymond');
INSERT INTO Brand_2 VALUES ('Victoria''s Secret', 'United States', 'Roy Raymond', 'L Brands Inc');

INSERT INTO Brand_1 VALUES ('Versace', 1978, 'Gianni Versace');
INSERT INTO Brand_2 VALUES ('Versace', 'Italy', 'Gianni Versace', 'Capri Holdings');

INSERT INTO Brand_1 VALUES ('Dior', 1946, 'Christian Dior');
INSERT INTO Brand_2 VALUES ('Dior', 'France', 'Christian Dior', 'LVMH Moet Hennessy');

INSERT INTO Fashion_Week_1 VALUES (2024, 'Fall/Winter', DATE '2024-03-15');
INSERT INTO Fashion_Week_2 VALUES ('FW0001', DATE '2024-03-15', 'Vancouver', DATE '2024-03-20', 'Vancouver Fashion Week showcasing emerging designers');

INSERT INTO Fashion_Week_1 VALUES (2024, 'Fall/Winter', DATE '2024-02-09');
INSERT INTO Fashion_Week_2 VALUES ('FW0002', DATE '2024-02-09', 'New York', DATE '2024-02-14', 'New York Fashion Week Fall Winter collections');

INSERT INTO Fashion_Week_1 VALUES (2024, 'Spring/Summer', DATE '2024-09-23');
INSERT INTO Fashion_Week_2 VALUES ('FW0003', DATE '2024-09-23', 'Paris', DATE '2024-10-01', 'Paris Fashion Week Spring Summer haute couture');

INSERT INTO Fashion_Week_1 VALUES (2024, 'Fall/Winter', DATE '2024-02-20');
INSERT INTO Fashion_Week_2 VALUES ('FW0004', DATE '2024-02-20', 'Milan', DATE '2024-02-26', 'Milan Fashion Week featuring Italian luxury brands');

INSERT INTO Fashion_Week_1 VALUES (2025, 'Spring/Summer', DATE '2025-09-05');
INSERT INTO Fashion_Week_2 VALUES ('FW0005', DATE '2025-09-05', 'New York', DATE '2025-09-12', 'NYFW Spring Summer ready-to-wear collections');


INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id) 
VALUES ('SH00000001', TO_TIMESTAMP('2024-03-15 19:30:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-03-15 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Vancouver Convention Centre', DATE '2024-03-15', 'FW0001');

INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id) 
VALUES ('SH00000002', TO_TIMESTAMP('2024-02-09 19:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-09 20:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Spring Studios', DATE '2024-02-09', 'FW0002');

INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id) 
VALUES ('SH00000003', TO_TIMESTAMP('2024-09-23 20:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-09-23 22:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Grand Palais', DATE '2024-09-23', 'FW0003');

INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id) 
VALUES ('SH00000004', TO_TIMESTAMP('2024-02-20 18:30:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2024-02-20 20:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'La Permanente Milano', DATE '2024-02-20', 'FW0004');

INSERT INTO Show (show_id, start_time, end_time, venue, start_date, fashion_week_2_id) 
VALUES ('SH00000005', TO_TIMESTAMP('2025-09-05 18:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-09-05 19:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'The Glasshouses', DATE '2025-09-05', 'FW0005');


INSERT INTO Model VALUES ('MD00000001', 500000, 55, 178, 28, 'Hadid', 'Gigi');
INSERT INTO Model VALUES ('MD00000002', 600000, 54, 180, 29, 'Hadid', 'Bella');
INSERT INTO Model VALUES ('MD00000003', 450000, 56, 177, 32, 'Shayk', 'Irina');
INSERT INTO Model VALUES ('MD00000004', 550000, 53, 179, 27, 'Jenner', 'Kendall');
INSERT INTO Model VALUES ('MD00000005', 400000, 57, 175, 25, 'Palvin', 'Barbara');

INSERT INTO ShowsModelWalks VALUES ('MD00000001', 'SH00000001');
INSERT INTO ShowsModelWalks VALUES ('MD00000001', 'SH00000002');
INSERT INTO ShowsModelWalks VALUES ('MD00000002', 'SH00000002');
INSERT INTO ShowsModelWalks VALUES ('MD00000002', 'SH00000003');
INSERT INTO ShowsModelWalks VALUES ('MD00000003', 'SH00000003');
INSERT INTO ShowsModelWalks VALUES ('MD00000004', 'SH00000004');
INSERT INTO ShowsModelWalks VALUES ('MD00000004', 'SH00000005');
INSERT INTO ShowsModelWalks VALUES ('MD00000005', 'SH00000001');

INSERT INTO Collections VALUES (2024, 'Fall/Winter', 'Urban Elegance', 45, 'SH00000001', 'Louis Vuitton', 'France');
INSERT INTO Collections VALUES (2024, 'Fall/Winter', 'Victorian Dreams', 38, 'SH00000002', 'Victoria''s Secret', 'United States');
INSERT INTO Collections VALUES (2024, 'Spring/Summer', 'Parisian Nights', 52, 'SH00000003', 'Dior', 'France');
INSERT INTO Collections VALUES (2024, 'Fall/Winter', 'Italian Renaissance', 41, 'SH00000004', 'Versace', 'Italy');
INSERT INTO Collections VALUES (2025, 'Spring/Summer', 'Modern Minimalism', 36, 'SH00000005', 'Gucci', 'Italy');

INSERT INTO Item VALUES (1, 2024, 'Fall/Winter', 'Urban Elegance', 'Evening Gown');
INSERT INTO Item VALUES (2, 2024, 'Fall/Winter', 'Urban Elegance', 'Leather Jacket');
INSERT INTO Item VALUES (3, 2024, 'Fall/Winter', 'Victorian Dreams', 'Lingerie Set');
INSERT INTO Item VALUES (4, 2024, 'Spring/Summer', 'Parisian Nights', 'Cocktail Dress');
INSERT INTO Item VALUES (5, 2024, 'Fall/Winter', 'Italian Renaissance', 'Silk Blouse');

INSERT INTO Designer VALUES ('DS00000001', 'nicolas.ghesquiere@lv.com', 'Nicolas', 'Ghesquière', 'École nationale supérieure des Arts Décoratifs');
INSERT INTO Designer VALUES ('DS00000002', 'sabato.derosa@gucci.com', 'Sabato', 'De Sarno', 'Istituto Marangoni');
INSERT INTO Designer VALUES ('DS00000003', 'maria.grazia@dior.com', 'Maria Grazia', 'Chiuri', 'Istituto Europeo di Design');
INSERT INTO Designer VALUES ('DS00000004', 'donatella.versace@versace.com', 'Donatella', 'Versace', 'University of Florence');
INSERT INTO Designer VALUES ('DS00000005', 'raul.martinez@vs.com', 'Raúl', 'Martínez', 'Parsons School of Design');

INSERT INTO DesignerCreatedCollection VALUES (2024, 'Fall/Winter', 'Urban Elegance', 'DS00000001');
INSERT INTO DesignerCreatedCollection VALUES (2024, 'Fall/Winter', 'Victorian Dreams', 'DS00000005');
INSERT INTO DesignerCreatedCollection VALUES (2024, 'Spring/Summer', 'Parisian Nights', 'DS00000003');
INSERT INTO DesignerCreatedCollection VALUES (2024, 'Fall/Winter', 'Italian Renaissance', 'DS00000004');
INSERT INTO DesignerCreatedCollection VALUES (2025, 'Spring/Summer', 'Modern Minimalism', 'DS00000002');

INSERT INTO GuestDesigner_1 VALUES ('Victoria''s Secret', 75000);
INSERT INTO GuestDesigner_2 VALUES ('DS00000005', 'Victoria''s Secret');

INSERT INTO CreativeDirector VALUES ('DS00000001', 2500000, '2013-01-01');
INSERT INTO CreativeDirector VALUES ('DS00000002', 1800000, '2023-01-15');
INSERT INTO CreativeDirector VALUES ('DS00000003', 2200000, '2016-07-08');
INSERT INTO CreativeDirector VALUES ('DS00000004', 3000000, '1997-03-20');

INSERT INTO CreativeDirectorDirects VALUES ('Louis Vuitton', 'France', 'DS00000001');
INSERT INTO CreativeDirectorDirects VALUES ('Gucci', 'Italy', 'DS00000002');
INSERT INTO CreativeDirectorDirects VALUES ('Dior', 'France', 'DS00000003');
INSERT INTO CreativeDirectorDirects VALUES ('Versace', 'Italy', 'DS00000004');