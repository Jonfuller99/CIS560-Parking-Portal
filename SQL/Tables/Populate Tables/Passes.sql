
INSERT INTO Parking.Passes (PassTypeYearID, PersonID, TimePurchased)
SELECT
    pty.PassTypeYearID,
    v.PersonID,
    DATEFROMPARTS(v.YearOfValidity, v.[Month], v.[Day])  -- or SYSDATETIMEOFFSET()
FROM (
    VALUES
('A', 2023, 3, 14, 1),
        ('B', 2023, 5, 22, 2),
        ('C', 2023, 7, 19, 3),
        ('D', 2023, 8, 30, 4),
        ('W', 2023, 12, 1, 5),

        ('A', 2024, 1, 12, 6),
        ('B', 2024, 3, 8, 7),
        ('C', 2024, 6, 18, 8),
        ('D', 2024, 9, 25, 9),
        ('W', 2024, 11, 3, 10),

        ('A', 2025, 2, 9, 11),
        ('B', 2025, 4, 15, 12),
        ('C', 2025, 5, 27, 13),
        ('D', 2025, 7, 6, 14),
        ('W', 2025, 10, 20, 15)
) AS v(PassType, YearOfValidity, [Month], [Day], PersonID)
JOIN Parking.PassTypeYears pty
    ON v.PassType = pty.PassType AND v.YearOfValidity = pty.YearOfValidity;


select * from Parking.Passes;


select * from Parking.PassTypeYears;





